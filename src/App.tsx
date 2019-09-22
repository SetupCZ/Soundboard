import React, { useRef, useState } from 'react';
import './App.css';
import { soundboardItems } from './Items';
import { Container } from 'nes-react';

const App: React.FC = () => {
    const [playing, setPlaying] = useState<Record<string, boolean>>({});
    const audioRefs: Record<string, HTMLAudioElement | null> = {};
    const play = (src: string) => {
        const audioRef = audioRefs[src];
        Object.values(audioRefs).map(x => {
            if (x) {
                x.currentTime = 0;
                x.pause();
            }
        });
        if (audioRef) {
            audioRef.currentTime = 0;
            audioRef.play();
            setPlaying({ ...playing, [src]: true });
        }
    };

    const addAudioRef = (ref: HTMLAudioElement | null, src: string) => {
        audioRefs[src] = ref;
    };

    const audioEnded = (src: string) => {
        setPlaying({ ...playing, [src]: false });
    };

    const stop = (src: string) => {
        const audioRef = audioRefs[src];
        if (audioRef) {
            audioRef.pause();
            audioEnded(src);
        }
    };

    return (
        <Container>
            <h1>Soundboard</h1>
            {soundboardItems.map(item => (
                <div style={{ marginBottom: 16 }}>
                    <audio src={item.Src} ref={ref => addAudioRef(ref, item.Src)} onEnded={e => audioEnded(item.Src)}></audio>
                    {playing[item.Src] ? (
                        <button className={'nes-btn is-warning w-100'} onClick={() => stop(item.Src)}>
                            STOP
                        </button>
                    ) : (
                        <button className={'nes-btn is-primary w-100'} onClick={() => play(item.Src)}>
                            {item.Title}
                        </button>
                    )}
                </div>
            ))}
        </Container>
    );
};

export default App;
