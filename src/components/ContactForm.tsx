import { useState } from 'react'
import type { FormEvent } from 'react'
import { profile } from '../data/portfolio'

export function ContactForm() {
  const [status, setStatus] = useState('')
  const [draft, setDraft] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `姓名：${data.get('name')}\n邮箱：${data.get('email')}\n\n${data.get('message')}`
    if (profile.email) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`作品集咨询：来自${data.get('name')}`)}&body=${encodeURIComponent(message)}`
      setStatus('邮件草稿已准备好，请在邮件应用中确认并发送。')
      return
    }
    try {
      await navigator.clipboard.writeText(message)
      setStatus('留言已复制。联系邮箱尚未公开，请保存留言，稍后联系。')
      setDraft('')
    } catch {
      setDraft(message)
      setStatus('请选中下方留言并复制。')
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>你的姓名<input name="name" placeholder="你的名字" autoComplete="name" maxLength={100} required /></label>
      <label>邮箱地址<input name="email" type="email" placeholder="请输入你的邮箱" autoComplete="email" maxLength={254} required /></label>
      <label>聊聊你的想法<textarea name="message" placeholder="聊聊你的项目或想法…" rows={3} maxLength={3000} required /></label>
      <button className="contact-submit" type="submit">{profile.email ? '联系我' : '复制留言'} <span aria-hidden="true">↗</span></button>
      <p className="form-status" role="status" aria-live="polite">{status || (profile.email ? '发送前，你可以在邮件应用中确认内容。' : '联系邮箱待补充，可先复制你的留言。')}</p>
      {draft && <textarea className="copy-fallback" aria-label="可复制的留言" value={draft} readOnly onFocus={(event) => event.currentTarget.select()} />}
    </form>
  )
}
