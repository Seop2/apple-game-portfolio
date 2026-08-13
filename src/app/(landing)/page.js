import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css"
import { Suspense } from "react";
import ReplayController from "@/components/modal/ReplayController";
import DemoComponent from "@/components/DemoComponent";

export default function LandingPage() {

    return (
        <>
            <main className={styles.page}>
                <section>
                    <Image src="/logo.png" width={150} height={150} alt="logo" priority />
                    <h1>재밌는 사과게임</h1>
                    <p>게임 설명</p>
                    <p>"제한 시간 동안 숫자 1부터 9까지 적힌 사과 중 합이 10이 되는 사과들을 드래그하여 사각형으로 묶어 없애는 퍼즐 게임입니다"</p>
                    <Link href="/play" className={styles.playButton}>게임 시작</Link>
                </section>

                <section>
                    <h2>데모 리플레이</h2>
                    <h3>어떤 게임인지 보여주는 영상</h3>
                    <Suspense fallback={<div>로딩중...</div>}>
                        <DemoComponent />
                    </Suspense>
                </section>

                <section>
                    <h2>게임 방법</h2>
                    <ol>
                        <li>게임 화면의 사과들을 마우스로 클릭 드래그하여 묶으세요</li>
                        <li>묶인 사과 중 합이 10이면 사과들이 사라져요</li>
                        <li>주어진 시간 안에 가장 높은 점수를 얻어보세요</li>
                    </ol>
                </section>

                <section className={styles.game_footer}>
                    <h2>앱으로 설치하고 언제 어디서나 즐기세요!</h2>
                    <ul>
                        <li>Android - <Link href="https://play.google.com/store/apps/details?id=com.jongsun.applegame">구글 플레이에서 다운로드</Link></li>
                        <li>IOS - <Link href="https://apps.apple.com/us/app/id6758793492">앱스토어에서 다운로드</Link></li>
                    </ul>
                    <h3>설치 시 오프라인에서도 즐길 수 있어요!</h3>
                </section>
            </main>
            <Suspense fallback={<div>로딩중...</div>}>
                <ReplayController />
            </Suspense>
        </>
    );
}
