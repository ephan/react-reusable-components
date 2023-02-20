"use client";
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import TableExample from '../components/Table/TableExample'
import CardExample from '../components/Card/CardExample'

import { useState } from 'react';
import DropdownExample from '@/components/DropDown/DropdownExample';
import DatePickerExample from '@/components/DatePicker/DatePickerExample';
import ButtonExample from '@/components/Button/ButtonExample'
import TooltipExample from '@/components/Tooltip/TooltipExample'
import VideoPlayerExample from '@/components/VideoPlayer/VideoPlayerExample';
import ImageCarousel from '@/components/Carousel/ImageCarousel';
import { ImageCarouselExample } from '@/components/Carousel/ImageCarouselExample';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  return (
    <>
    <ImageCarouselExample />
    <TableExample />
    <CardExample />
    <DropdownExample />
    <DatePickerExample />
    <ButtonExample />
    <TooltipExample />
    <VideoPlayerExample />
    </>
  );
}
