'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import {
    Image,
    Tooltip,
} from '@nextui-org/react'
import { useTheme } from 'next-themes'

type Dataset = {
    label: string
    data: any[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
}

type Data = {
    labels: string[]
    datasets: Dataset[]
}

type Options = {
    scales: {
        y: {
            beginAtZero: boolean
            max: number
        }
    }
}

type EmotionImg = {
    [key: string]: {
        src?: string | any | undefined | null
        text?: string
        emo?: string
        mean?: string
    }
}

const emotionImg: EmotionImg = {
    happy: {
        src: '/3_love.png',
        text: '늘 행복해 :)',
        emo: '행복',
        mean: '',
    },
    suprise: { src: '/normal.png', text: '엄마야!', emo: '놀람', mean: '' },
    angry: { src: '/angry.png', text: '너무 화가난다아', emo: '분노', mean: '' },
    sad: { src: '/sad.png', text: '너무 슬퍼 :(', emo: '슬픔', mean: '' },
    depress: {
        src: '/depress.png',
        text: '너무 불안불안..',
        emo: '불안',
        mean: '',
    },
    normal: {
        src: '/nothinking.png',
        text: '나는 아무생각이없어',
        emo: '중립',
        mean: '',
    },
}

const MainChartDark = () => {
    const { systemTheme, theme, setTheme } = useTheme() // 다크모드테마 설정
    const currentTheme = theme === 'system' ? systemTheme : theme
    const chartRef = useRef<HTMLCanvasElement>(null)
    let chartInstance: Chart | null = null;

    let labels = ['행복', '당황', '분노', '슬픔', '불안', '중립']
    var data = [60, 12, 15, 20, 10, 33];


    const createChart = () => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d') as CanvasRenderingContext2D

            Chart.register(...registerables)
            Chart.defaults.color = '#eee'
            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '사용자의 감정 기록',
                            data: data,
                            backgroundColor: [
                                'rgba(240, 207, 211, 0.4)',
                                'rgba(255, 206, 86, 0.4)',

                                // 'rgba(239, 203, 207, 0.2)', // 사랑
                                'rgba(255, 99, 132, 0.4)',
                                'rgba(75, 192, 192, 0.4)',

                                // 'rgba(174, 221, 251, 0.2)', // 우울
                                'rgba(181, 224, 251, 0.4)',
                                'rgba(171, 171, 171, 0.4)', // 생각없음
                            ],
                            borderColor: [
                                'rgba(240, 207, 211, 1)',
                                'rgba(255, 206, 86, 1)',
                                // 'rgba(239, 203, 207, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(75, 192, 192, 1)',
                                // 'rgba(174, 221, 251, 1)', //우울
                                'rgba(181, 224, 251, 1)',
                                'rgba(171, 171, 171, 1)', // 생각없음
                            ],
                            borderWidth: 1,
                        }
                    ],
                },
                options: {
                    scales: {
                        x: {
                            grid: {
                                display: false, // Set display to false to hide grid lines
                            },
                        },
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                display: false, // Set display to false to hide grid lines
                            },
                        }
                    },
                    plugins: {

                    }
                },
            })
        }
    }
    const destroyChart = () => {
        if (chartInstance) {
            chartInstance.destroy()
            chartInstance = null
        }
    }
    useEffect(() => {
        destroyChart()
        createChart()
        return () => destroyChart()
    }, [currentTheme])
    return (
        <div className='w-full h-full fade-div dark:bg-[#474747] rounded-md p-[7px]'>
            <div className='flex flex-col w-full h-[450px] items-center dark:text-[white]'>
                <canvas ref={chartRef} className='flex justify-around w-full h-full' />
                <div className={`w-full flex justify-center ml-10 gap-[97px]`}>
                    {' '}
                    {Object.entries(emotionImg).map(([key, value]) => (
                        <React.Fragment key={key}>
                            {' '}
                            <Tooltip
                                placement="top"
                                content={
                                    typeof value === 'string' ? key : value.text || key
                                }
                                color="default"
                                delay={0}
                                closeDelay={0}
                                motionProps={{
                                    variants: {
                                        exit: {
                                            opacity: 0,
                                            transition: {
                                                duration: 0.1,
                                                ease: 'easeIn',
                                            },
                                        },
                                        enter: {
                                            opacity: 1,
                                            transition: {
                                                duration: 0.15,
                                                ease: 'easeOut',
                                            },
                                        },
                                    },
                                }}
                            >
                                <Image
                                    src={typeof value === 'string' ? value : value.src}
                                    className="mt-1 "
                                    width={50}
                                    height={50}
                                ></Image>
                            </Tooltip>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainChartDark