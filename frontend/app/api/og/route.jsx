import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text");
    if (!text) {
        return new ImageResponse(<>Visit with &quot;?text=sufob.com&quot;</>, {
            width: 1200,
            height: 630,
        });
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    fontSize: 90,
                    color: "black",
                    background: "#f6f6f6",
                    width: "100%",
                    height: "100%",
                    // paddingTop: 50,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* <img
                    width="256"
                    height="256"
                    src={`http://dev.sufob.com/_next/image?url=%2Flogo.png&w=48&q=75`}
                    style={{
                        borderRadius: 128,
                    }}
                /> */}
                <p>www.sufob.com</p>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
