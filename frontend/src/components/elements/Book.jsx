'use client'

import React, { useState } from 'react'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export const Book = ({onClick}) => {

    return (
        <div onClick={onClick} className="absolute cursor-pointer bottom-5 right-5 bg-sin_derechos bg-opacity-75 w-40 h-40 rounded-md">
            <div className="flex justify-center items-center w-full h-full">
                <img src="/img/world/bookGif.gif" alt="GIF" className="w-52 h-52 object-cover" />
            </div>
        </div>
    );

};