import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name ="Shin Code";
export const siteTitle = "Next.js blog";

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {
    return (
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
            {home ? (
                <>
                    <img 
                    src="/images/profile.png"
                    alt="Profile Image"
                    className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
            ) : (
                <>
                    <img 
                    src="/images/profile.png"
                    alt="Profile Image"
                    className={`${utilStyles.borderCircle}`}
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
            )}
        </header>
        <main>{children}</main>
        {!home && (
            <div>
                <Link href="/">←ホームに戻る</Link>
            </div>
        )}
    </div>
    )
}