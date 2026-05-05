const CONTACT_WEBHOOK_URL = (import.meta.env.VITE_CONTACT_WEBHOOK_URL || 'https://open.feishu.cn/open-apis/bot/v2/hook/ab4c719a-926e-4dc2-8f0f-2bd422d08e8a').trim()

function buildCard({ name, email, phone, message }) {
  const fields = [
    { is_short: true, text: { tag: 'lark_md', content: `**姓名**\n${name}` } },
    { is_short: true, text: { tag: 'lark_md', content: `**邮箱**\n${email}` } },
  ]

  if (phone) {
    fields.push({ is_short: true, text: { tag: 'lark_md', content: `**电话**\n${phone}` } })
  }

  fields.push({ is_short: false, text: { tag: 'lark_md', content: `**留言**\n${message}` } })

  return {
    msg_type: 'interactive',
    card: {
      header: {
        title: { tag: 'plain_text', content: '📩 剪艺官网 — 新联系消息' },
        template: 'turquoise'
      },
      elements: [
        { tag: 'div', fields },
        { tag: 'hr' },
        {
          tag: 'note',
          elements: [
            { tag: 'plain_text', content: `提交时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}` }
          ]
        }
      ]
    }
  }
}

export async function sendContactMessage({ name, email, phone, message }) {
  const body = buildCard({ name, email, phone, message })

  const res = await fetch(CONTACT_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    throw new Error(`请求失败 (${res.status})`)
  }

  const data = await res.json()
  if (data.code !== 0 && data.StatusCode !== 0) {
    throw new Error(data.msg || '发送失败')
  }

  return data
}
