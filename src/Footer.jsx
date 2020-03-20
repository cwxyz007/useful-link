import { h } from 'preact'

export default function Footer() {
  return (
    <div className="footer">
      <span className="footer-box">
        <span>Powered by </span>
        <a
          className="footer-item"
          target="_blank"
          rel="noopener noreferrer"
          href="https://preactjs.com/"
        >
          preact
        </a>
        <span> and </span>
        <a
          className="footer-item"
          target="_blank"
          rel="noopener noreferrer"
          href="https://fusejs.io/"
        >
          fuse.js
        </a>
      </span>
    </div>
  )
}
