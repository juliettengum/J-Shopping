'use client'

import { motion } from 'motion/react'

export const InfoSvg = () => {
  return (
    <motion.svg
      className='z-10 dark:invert'
      xmlns='http://www.w3.org/2000/svg'
      width='193'
      height='49'
      viewBox='0 0 193 49'
      fill='none'
      initial='hidden'
      animate='visible'
      aria-hidden='true'
    >
      <motion.path
        d='M10 7.81055H150.67C155.6 7.81055 160.272 10.0105 163.413 13.8102L191 47.1884'
        stroke='#D0D0D0'
        strokeWidth='3'
        variants={{
          hidden: { pathLength: 0, pathOffset: 1, strokeDasharray: '8 8' },
          visible: {
            pathLength: 1,
            pathOffset: 0,
            strokeDasharray: '8 8',
            transition: {
              delay: 0.8,
              duration: 0.5
            }
          }
        }}
      />
      <motion.circle
        opacity='0.2'
        cx='7.5'
        cy='7.5'
        r='7.5'
        fill='#0A0A0A'
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 0.2,
            transition: {
              delay: 1.3,
              duration: 0.9
            }
          }
        }}
      />
      <motion.circle
        opacity='0.4'
        cx='7.49846'
        cy='7.49455'
        r='6.20939'
        fill='#0A0A0A'
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 0.4,
            transition: {
              delay: 1.3,
              duration: 0.9
            }
          }
        }}
      />
      <motion.circle
        opacity='0.5'
        cx='7.50028'
        cy='7.58036'
        r='4.34793'
        fill='#0A0A0A'
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 0.5,
            transition: {
              delay: 1.3,
              duration: 0.9
            }
          }
        }}
      />
    </motion.svg>
  )
}
