import Link from "next/link";
import Image from "next/image";
export default function ContactPage() {
    return (
        <div className="container mt-12 lg:mb-20 items-center">
            <h1 className="mt-12">联系Charlie Sue</h1>
            <p className="mt-12">
                邮箱:
                <Link href="mailto:sue@sufob.com">sue@sufob.com</Link>
            </p>
            <p className="mt-12">
                或扫码添加微信（备注：外贸SEO）:
                <Image
                    src="/wechat.jpg"
                    alt="Charlie Sue外贸站"
                    width={200}
                    height={200}
                />
            </p>
        </div>
    );
}
