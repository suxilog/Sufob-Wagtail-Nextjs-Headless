export default function PageHeader({ title }) {
    return (
        <div className="text-center dark-copy py-14 px-6 bg-quaternary-purple">
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-primary-purple mx-auto"
            >
                <path
                    opacity="0.2"
                    d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                    fill="currentColor"
                ></path>
                <path
                    d="M39.8394 18.788C40.2081 17.9317 39.9331 16.9318 39.1769 16.3818C38.4207 15.8318 37.3895 15.8818 36.6833 16.4943L20.6838 30.4938C20.0588 31.0438 19.8338 31.925 20.1276 32.7C20.4213 33.4749 21.1713 33.9999 22.0025 33.9999H28.971L24.1649 45.212C23.7962 46.0683 24.0712 47.0682 24.8274 47.6182C25.5836 48.1682 26.6149 48.1182 27.3211 47.5057L43.3205 33.5062C43.9455 32.9562 44.1705 32.075 43.8767 31.3C43.583 30.5251 42.8393 30.0063 42.0018 30.0063H35.0333L39.8394 18.788Z"
                    fill="currentColor"
                ></path>
            </svg>
            <h1 className="font-headings tracking-tight scroll-mt-[120px] text-4xl lg:text-5xl 2xl:text-6xl font-bold mt-6 wrap-balance uppercase ">
                {title}
            </h1>
            <div className="font-copy text-base 2xl:text-md font-medium print:text-[12px] print:text-justify mt-6 max-w-xl mx-auto">
                <p className="my-6 first:mt-0 last:mb-0 print:my-2 text-gray-600"></p>
            </div>
        </div>
    );
}
