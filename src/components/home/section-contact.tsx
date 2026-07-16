import { contact } from '@/data/home'

export function ContactSection() {
  return (
    <section id="contact" className="py-32 md:py-40 bg-[#F5F5F5]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div
          className="max-w-[600px]"
        >
          <p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">Contact</p>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-light tracking-[-0.02em] text-[#111] leading-[1.15] mb-16">联系我们</h2>

          <div className="space-y-10">
            {contact.emails.map(e => (
              <div key={e.label}>
                <p className="text-[0.68rem] tracking-[0.12em] text-neutral-400 uppercase mb-2">{e.label}</p>
                <a
                  href={`mailto:${e.value}`}
                  className="text-[1.0rem] text-[#111] hover:text-neutral-500 transition-colors no-underline font-light"
                >
                  {e.value}
                </a>
              </div>
            ))}
            <div>
              <p className="text-[0.68rem] tracking-[0.12em] text-neutral-400 uppercase mb-2">地址</p>
              <p className="text-[0.95rem] text-neutral-600 font-light">{contact.address}</p>
            </div>
            <div>
              <p className="text-[0.68rem] tracking-[0.12em] text-neutral-400 uppercase mb-2">工作时间</p>
              <p className="text-[0.95rem] text-neutral-600 font-light">{contact.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
