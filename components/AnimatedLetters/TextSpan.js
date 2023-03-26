import {motion, useAnimationControls} from 'framer-motion';
import { useState } from 'react';

const TextSpan = ({children}) => {
    const controls = useAnimationControls();
    const [isPlay, setIsPlay] = useState(false);

    const rubberBand = () => {
        controls.start({
            transform: [
                "scale3d(1,1,1)",
                "scale3d(1.4,0.55,1)",
                "scale3d(0.75,1.25,1)",
                "scale3d(1.25,0.85,1)",
                "scale3d(0.9,1.05,1)",
                "scale3d(1,1,1)",
            ],
        });
        setIsPlay(true);
    }
    

    return(
        <motion.span 
        animate={controls}
        onMouseOver={() => {
            if(!isPlay)
                rubberBand();
        }}
        onAnimationComplete={() => setIsPlay(false)}
        >
            {children}
        </motion.span>
    )
}

export default TextSpan;