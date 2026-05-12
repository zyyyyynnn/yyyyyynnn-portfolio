import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { Stamp } from '../components/Stamp'
import { contact } from '../data/portfolio'

type CopyTarget = 'qq' | 'wechat' | 'failed' | ''

export function AboutContact() {
  const [copied, setCopied] = useState<CopyTarget>('')

  const copy = async (label: CopyTarget, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      window.setTimeout(() => setCopied(''), 1400)
    } catch {
      setCopied('failed')
    }
  }

  return (
    <>
      <section className="section about-section" id="about">
        <SectionHeader number="05" title="About" subtitle="关于我" note="one page, one trace" />
        <article className="paper-card about-card about-single" data-reveal>
          <Stamp>05</Stamp>
          <h3>About</h3>
          <p>
            在校生，写代码，也用手机记录一些光线和猫。喜欢把系统设计和取景角度同等认真地对待：一边整理逻辑，一边收集日常的形状。
          </p>
          <div className="paper-tags">
            {['Student', 'Frontend', 'System Design', 'Mobile Photography', 'Cats'].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      </section>
      <section className="section contact-section" id="contact">
        <SectionHeader number="06" title="Contact" subtitle="联系方式" note="reachable notes" />
        <article className="paper-card contact-card contact-single" data-reveal>
          <Stamp>06</Stamp>
          <h3>Contact</h3>
          <a className="contact-line primary" href={`mailto:${contact.primaryEmail}`}>
            {contact.primaryEmail}
          </a>
          <a className="contact-line" href={contact.github} target="_blank" rel="noreferrer">
            {contact.githubLabel} ↗
          </a>
          <p className="contact-line">Douyin: {contact.douyin}</p>
          <div className="copy-row">
            <button type="button" onClick={() => copy('qq', contact.secondaryEmail)}>
              {copied === 'qq' ? 'Copied' : 'Copy QQ Email'}
            </button>
            <button type="button" onClick={() => copy('wechat', contact.wechat)}>
              {copied === 'wechat' ? 'Copied' : 'Copy WeChat'}
            </button>
          </div>
          {copied === 'failed' ? <p className="copy-status">Copy failed</p> : null}
          <p className="hand-note">let&apos;s build something quiet.</p>
        </article>
      </section>
    </>
  )
}
