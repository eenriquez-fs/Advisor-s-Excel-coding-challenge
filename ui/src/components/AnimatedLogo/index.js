'use client';
import Image from 'next/image';
import React, { useState } from 'react';

export default function AnimatedLogo({ width, height }) {
  const [animationKey, setAnimationKey] = useState(0);

  const handleChangeKey = () => {
    const newKey = animationKey + 1;
    setAnimationKey(newKey);
  };

  return (
    <>
      <Image
        key={animationKey}
        className="mx-auto w-auto"
        width={width}
        height={height}
        src="/images/soundplay-logo.png"
        alt="SoundPlay"
        style={{
          animation: 'spin-logo',
          animationDuration: '3s'
        }}
        onClick={handleChangeKey}
      />
    </>
  );
}