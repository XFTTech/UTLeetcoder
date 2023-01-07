import React, { useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile'
import MobileDailyLog from './DailyList'


const tabItems = [
    { key: 'easy', title: 'Easy' },
    { key: 'medium', title: 'Medium' },
    { key: 'hard', title: 'Hard' },
    { key: 'total', title: 'Total' },
]

const Difficulties = (props) => {
    const swiperRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(1)

    return (
        <>
            <Tabs
                activeKey={tabItems[activeIndex].key}
                onChange={key => {
                    const index = tabItems.findIndex(item => item.key === key)
                    setActiveIndex(index)
                    swiperRef.current?.swipeTo(index)
                }}
            >
                {tabItems.map(item => (
                    <Tabs.Tab title={item.title} key={item.key} />
                ))}
            </Tabs>
            <Swiper
                direction='horizontal'
                loop
                indicator={() => null}
                ref={swiperRef}
                defaultIndex={activeIndex}
                onIndexChange={index => {
                    setActiveIndex(index)
                }}
            >
                <Swiper.Item>
                    <MobileDailyLog date={props.date} users={props.users} difficulty="easy" />
                </Swiper.Item>
                <Swiper.Item>
                    <MobileDailyLog date={props.date} users={props.users} difficulty="medium" />
                </Swiper.Item>
                <Swiper.Item>
                    <MobileDailyLog date={props.date} users={props.users} difficulty="hard" />
                </Swiper.Item>
                <Swiper.Item>
                    <MobileDailyLog date={props.date} users={props.users} difficulty="total" />
                </Swiper.Item>
            </Swiper>
        </>
    )
}

export default Difficulties