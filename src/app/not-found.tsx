import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p>404</p>
      <h1>PAGE NOT FOUND</h1>
      <Link href="/">返回中文首页 / RETURN HOME</Link>
    </main>
  )
}
