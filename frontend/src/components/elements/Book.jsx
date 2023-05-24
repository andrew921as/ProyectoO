'use client'

import React, { useState } from 'react'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export const Book = () => {

    return (
        <div className="absolute bottom-5 right-5 bg-sin_derechos bg-opacity-75 w-40 h-40 rounded-md">
            <div className="flex justify-center items-center w-full h-full">
                <img src="/img/world/book.png" alt="Imagen" className="w-1/2 h-1/2 object-cover" />
            </div>
        </div>
    );

};