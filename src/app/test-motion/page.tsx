"use client";

import ScrollVideo from "@/components/home/ScrollVideo";

/**
 * Pagina de teste simplificada apenas com o efeito de Scroll Video.
 */
export default function TestMotionPage() {
    return (
        <main className="bg-[#0a0a0a] overflow-x-hidden">
            <ScrollVideo
                src="/videocap.mp4"
                scrollHeight={200}
                showProgress={true}
                showFrameCounter={true}
                cropWidth={60}
                startFrame={10}
                endFrame={40}
            />
        </main>
    );
}
