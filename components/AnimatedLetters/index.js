import React from "react";
import TextSpan from "./TextSpan";

const MESSAGE = `Welcome To EdgeChat`;

const AnimatedLetters = () => {
    const sentence = MESSAGE.split('');
    return(
        <div className="animated-letters font-poppins">
            <h1>
                {sentence.map((letter, index) => {
                    return(
                        <TextSpan key={index}>
                            {letter === ` ` ? `\u00A0` : letter}
                        </TextSpan>
                    )
                })}
            </h1>
        </div>
    )
}

export default AnimatedLetters;