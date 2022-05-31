import { useRef } from 'react'
import { ButtonSmall } from 'ui/Button'
import './style.css'

export default function GeneralContent({onFullscreen}) {

    return (
        <section className='GeneralContent'>
            <ButtonSmall className="GeneralContent-fullscreen" onClick={onFullscreen} title="Fullscreen">⛶</ButtonSmall>
            <article className='GeneralContent-article'>
                Combining data from NASA's Chandra X-ray Observatory with radio observations and computer simulations, an international team of scientists has discovered a vast wave of hot gas in the nearby Perseus galaxy cluster.
                <a href="http://www.nasa.gov/centers/goddard/home/index.html" rel="nofollow">NASA Goddard Space Flight Center</a>
            </article>
        </section>
    )
}