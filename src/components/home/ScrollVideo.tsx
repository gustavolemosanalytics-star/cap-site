"use client";

import React, { useRef, useEffect, useState } from 'react';

interface ScrollVideoProps {
    src: string;
    scrollHeight?: number;
    showProgress?: boolean;
    showFrameCounter?: boolean;
    className?: string;
    children?: React.ReactNode;
    cropWidth?: number; // Porcentagem da largura visível (ex: 50 = 50% da largura, cortando laterais)
    startFrame?: number; // Frame inicial do vídeo
    endFrame?: number; // Frame final do vídeo (se não definido, usa o último frame)
}

export default function ScrollVideo({
    src,
    scrollHeight = 500,
    showProgress = true,
    showFrameCounter = false,
    className = '',
    children,
    cropWidth = 100, // 100 = sem corte, 50 = mostra 50% da largura central
    startFrame = 0, // Frame inicial (baseado em 24fps)
    endFrame // Frame final (se não definido, usa o último frame do vídeo)
}: ScrollVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [totalFrames, setTotalFrames] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;

        if (!video || !container) return;

        const handleLoadedMetadata = () => {
            video.pause();
            // Define o tempo inicial baseado no startFrame (24fps)
            video.currentTime = startFrame / 24;
            // Estima frames baseado em 24fps
            const estimatedFrames = Math.round(video.duration * 24);
            setTotalFrames(estimatedFrames);
            setCurrentFrame(startFrame);
        };

        const handleCanPlay = () => {
            setIsLoaded(true);
        };

        // Força o carregamento imediato
        video.load();

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('canplay', handleCanPlay);

        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;

            ticking = true;
            requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const scrollStart = -rect.top;
                const scrollRange = container.offsetHeight - window.innerHeight;

                // Calcula progresso (0 a 1)
                const scrollProgress = Math.min(Math.max(scrollStart / scrollRange, 0), 1);

                // Atualiza o vídeo considerando startFrame e endFrame
                if (video.duration) {
                    const startTime = startFrame / 24;
                    const finalFrame = endFrame ?? totalFrames;
                    const endTime = finalFrame / 24;
                    const duration = endTime - startTime;
                    const targetTime = startTime + (scrollProgress * duration);
                    if (Math.abs(video.currentTime - targetTime) > 0.03) { // Small threshold to avoid micro-jitter
                        video.currentTime = targetTime;
                    }
                }

                const finalFrame = endFrame ?? totalFrames;
                const currentFrameNum = startFrame + Math.round(scrollProgress * (finalFrame - startFrame));
                setProgress(scrollProgress);
                setCurrentFrame(currentFrameNum);
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('canplay', handleCanPlay);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [totalFrames, startFrame, endFrame]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${className}`}
            style={{ height: `${scrollHeight}vh` }}
        >
            {/* Video Wrapper Fixo */}
            <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center bg-[#0a0a0f] z-0 overflow-hidden">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    className={`h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        // Se cropWidth < 100, aumenta a escala do vídeo para "cortar" as laterais
                        width: cropWidth < 100 ? `${(100 / cropWidth) * 100}%` : '100%',
                        maxWidth: 'none'
                    }}
                >
                    <source src={src} type="video/mp4" />
                </video>

                {/* Loading state */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]">
                        <div className="w-10 h-10 border-4 border-white/10 border-t-red-500 rounded-full animate-spin" />
                    </div>
                )}

                {/* Content Overlay - Pass children if needed */}
                {children}
            </div>

            {/* Progress Bar */}
            {showProgress && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full z-50 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-100"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
            )}

            {/* Frame Counter */}
            {showFrameCounter && (
                <div className="fixed top-24 right-5 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-white/70 z-50">
                    FRAME: {currentFrame} / {totalFrames}
                </div>
            )}

            {/* Scroll Hint */}
            <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 transition-opacity duration-500 z-50 ${progress > 0.05 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="w-5 h-8 border-2 border-white/20 rounded-full relative">
                    <div className="w-1 h-2 bg-red-500 rounded-full absolute top-1 left-1/2 -translate-x-1/2 animate-bounce" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em]">Role para animar</span>
            </div>
        </div>
    );
}
