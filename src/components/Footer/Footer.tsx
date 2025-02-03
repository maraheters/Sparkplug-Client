import styles from "./Footer.module.scss"

function Footer() {

    return(
        <footer className={styles.footer}>
            <p className={styles.logo}>🚀sparkplug</p>
            <p>© 2025 Sparkplug, Inc. All rights reserved.</p>
        </footer>
    )
}

export default Footer;