import { IonContent, IonPage } from "@ionic/react"
import axios from "axios";
import { useEffect, useState } from "react"
import HeaderUser from "../components/HeaderUser"
import PakarSlide from "../components/PakarSlide";
import { PakarState } from "../datas/pakar";
import { errorMessage } from "../services/toastService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import ChatFabBox from "../components/ChatBox";

const Konsultasi: React.FC = () => {

    const [pakarList, setPakarList] = useState<PakarState[]>([]);

    const getPakars = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/pakar`);
            if (response.status === 200) {
                setPakarList(response.data);
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    useEffect(() => {
        getPakars()
    }, [])

    return (
        <IonPage>
            <HeaderUser />
            <IonContent>
                <div className="flex justify-center items-center w-full p-10 h-[600px]">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        grabCursor={true}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {
                            pakarList.map((data, index) => (
                                <SwiperSlide key={`pakar-slide-${index}`}>
                                    <PakarSlide data={data} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <ChatFabBox />
            </IonContent>
        </IonPage>
    )
}

export default Konsultasi;