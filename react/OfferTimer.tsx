import React, { useEffect, useState } from 'react'

import { useCssHandles } from 'vtex.css-handles'
import './css/style.css'

const CSS_HANDLES = ['container', 'inner', 'title', 'titleDesc', 'timer', 'left', 'block', 'divider', 'dateTitle'] as const

// Define a data-alvo da promoção (formato: YYYY-MM-DDTHH:MM:SS)
interface OfferTimerProps {
  targetDate?: string // formato: 'YYYY-MM-DDTHH:mm:ss'
}

function OfferTimer({ targetDate = '2025-09-12T23:59:59' }: OfferTimerProps) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(new Date(targetDate)))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(new Date(targetDate)))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={handles.container}>
      <div className={handles.inner}>

        {/* Left side */}
        <div className={handles.left}>
          <div className={handles.title}>OFERTAS LIMITADAS</div>
          <div className={handles.titleDesc}>Produtos com preços imperdíveis</div>
        </div>

        {/* Right side */}
        <div className={handles.timer}>
          <div className={`${handles.block}`} >
            <p>{`${timeLeft.days}`}</p>
            <p className={handles.dateTitle}>Dias</p>
          </div>
          <div className={handles.divider}>:</div>
          <div className={`${handles.block}`} >
            <p>{`${timeLeft.hours}`}</p>
            <p className={handles.dateTitle}>Horas</p>
          </div>
          <div className={handles.divider}>:</div>
          <div className={`${handles.block}`} >
            <p>{`${timeLeft.minutes}`}</p>
            <p className={handles.dateTitle}>Minutos</p>
          </div>
          <div className={handles.divider}>:</div>
          <div className={`${handles.block}`} >
            <p>{`${timeLeft.seconds}`}</p>
            <p className={handles.dateTitle}>Segundos</p>
          </div>
        </div>

      </div>
    </div>
  )
}

function getTimeRemaining(targetDate: Date) {
  const total = targetDate.getTime() - new Date().getTime()

  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return {
    total,
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  }
}

function pad(num: number) {
  return num < 10 ? `0${num}` : `${num}`
}


OfferTimer.schema = {
  title: 'Offer Timer',
  description: 'Contador de ofertas com data administrável',
  type: 'object',
  properties: {
    targetDate: {
      title: 'Data alvo',
      description: 'Data final da oferta (YYYY-MM-DDTHH:mm:ss)',
      type: 'string',
      default: '2025-09-12T23:59:59',
    },
  },
}

export default OfferTimer