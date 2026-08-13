# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

- `npm run dev` — 개발 서버 실행 (Turbopack)
- `npm run build` — 프로덕션 빌드 (Turbopack). `<Suspense>` 경계 밖에서 `useSearchParams()`를 쓰면 `next dev`에서는 조용히 넘어가지만 이 빌드에서는 실패합니다 — 페이지 관련 변경은 `dev`만 보지 말고 항상 `npm run build`로도 검증하세요.
- `npm run start` — 프로덕션 빌드 서빙
- `npm run lint` — ESLint (`eslint-config-next/core-web-vitals`)

이 저장소엔 테스트 러너가 구성되어 있지 않습니다 (Jest/Vitest/Playwright 없음).

## 아키텍처

Next.js 16 App Router + React 19, React Compiler 활성화 (`next.config.mjs`의 `reactCompiler: true`) — 컴파일러와 충돌하는 수동 `useMemo`/`useCallback` 최적화는 지양하세요. 경로 별칭 `@/*` → `src/*`.

### 게임 보드는 React 컴포넌트가 아니라 순수 웹 컴포넌트입니다

`src/components/play/game.js`는 `AppleGameBoard`를 정의하는데, 커스텀 엘리먼트 `apple-game-board`로 등록된 순수 `HTMLElement` 서브클래스이며, `connectedCallback`에서 템플릿 문자열로 closed shadow DOM을 구성합니다. 드래그 선택, 합이 10인 사과 수집, 카운트다운 타이머, 리플레이 기록/재생까지 모든 게임 로직이 여기에 명령형으로 구현되어 있습니다. React 컴포넌트가 아니므로 React적인 props/state가 없고, 인스턴스 메서드 호출(`start()`, `stop()`, `replay(data)`)과 DOM 노드에서 발생하는 이벤트(`gameover` CustomEvent) 구독으로 제어됩니다.

보드 크기와 라운드 길이는 `:host`의 CSS 커스텀 프로퍼티(`--num-rows`, `--num-cols`, `--duration`)로 설정되며, 연결 시점에 `getComputedStyle`로 읽어옵니다 — 레이아웃/타이밍을 바꾸려면 JS 상수가 아니라 이 커스텀 프로퍼티를 수정하세요.

`src/components/play/GameBoard.js`는 이 엘리먼트를 React용으로 감쌉니다: DOM을 직접 다루기 때문에 `next/dynamic(..., { ssr: false })`로 로드되고, `ref`/`className`을 그대로 전달합니다(React 19는 `forwardRef` 없이 `ref`를 일반 prop으로 받을 수 있음). 이 엘리먼트가 비동기(dynamic import)로 마운트되기 때문에, **일반 `useRef` + `useEffect(fn, [dep])` 조합은 노드가 생기기 전에 먼저 실행되고 이후 다시 실행되지 않는 경우가 많습니다.** 이 코드베이스에서 검증된 패턴은 콜백 ref입니다 — `src/app/play/page.js`의 `attachRef`를 참고하세요. React가 노드가 실제로 붙는 시점에 정확히 호출해주며, (React 19 콜백 ref 시맨틱에 따라) 정리 함수를 리턴할 수도 있습니다. 보드 엘리먼트가 준비되는 즉시 뭔가를 해야 하는 코드라면 이 패턴을 쓰세요.

### 리플레이 시스템

플레이 중 보드는 모든 드래그를 `{ pos1, pos2, time }`으로, 모든 새로고침을 `{ refresh: true, time }`으로 기록하고, 그동안 보여준 사과 배치 두 가지(`board1`, 새로고침했다면 `board2`)도 저장합니다. 게임이 끝나면 `detail.replay = { logs, board1, board2 }`를 담은 `gameover` CustomEvent를 발생시킵니다. 엘리먼트에서 `.replay(data)`를 호출하면 `requestAnimationFrame` 루프(`replayTick`)로 같은 로그를 그대로 재생하며, 내부 `replaying` 플래그로 게이팅되어 재생 중에는 실제 사용자 입력도 막습니다.

### 랭킹 + 공유 흐름

- `src/app/store.js` — 상위 10위 랭킹 목록을 들고 있는 `RankingProvider`/`useRanking` React Context이며 `localStorage`에 저장됩니다. `VERSION` 상수가 저장된 데이터 형태를 관리하므로, 레코드 구조가 바뀌면 이 값을 올려서 기존 캐시를 무효화하세요. `addRecord`는 리플레이 페이로드를 저장하기 전에 `lz-string`(`compressToEncodedURIComponent`)으로 압축하는데, 이 압축된 문자열이 나중에 공유 URL에 그대로 들어가기 때문입니다.
- `src/components/modal/ReplayController.js`는 `useSearchParams()`로 `?replay=` 쿼리 파라미터를 읽어서 (아직 압축된 상태의) 문자열을 `ReplayModal`에 넘깁니다. `useSearchParams()`를 쓰는 컴포넌트는 렌더링되는 곳에서 반드시 `<Suspense>`로 감싸야 합니다(`(landing)/page.js` 참고) — 안 그러면 `next build`가 그대로 실패합니다.
- `src/components/modal/ReplayModal.js`는 `decompressFromEncodedURIComponent`로 압축을 풀고 `.replay()`로 보드를 재생시키며, "공유하기" 버튼은 `location.origin`에 `?replay=<압축된 값>`을 붙여 클립보드에 복사합니다.

### 스타일링

전체적으로 CSS Modules(`*.module.css`)를 사용합니다. 디자인 토큰은 `src/app/globals.css`의 `:root`에 한 번만 정의된 CSS 커스텀 프로퍼티로 관리됩니다: 원시 팔레트(`--clr-*`)가 시맨틱 토큰(`--color-*`)에 흘러들어가는 구조입니다. React CSS Modules와 `game.js`의 인라인 `<style>`(shadow DOM) 양쪽이 동일한 커스텀 프로퍼티를 참조하므로, `globals.css`에서 토큰을 바꾸면 shadow DOM에도 자동으로 반영됩니다.

### 커밋 메시지 컨벤션 (README.md 기준)

`feat`/`fix`/`docs`/`style`/`test`/`refactor`/`build`/`chore`/`ci` 접두사 사용.
