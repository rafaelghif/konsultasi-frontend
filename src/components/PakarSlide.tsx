import { IonAvatar, IonCard, IonCardContent, IonImg } from "@ionic/react"
import { PakarState } from "../datas/pakar";
import profilePicture from '../assets/images/profile.png';

interface PakarSlideState {
    data: PakarState;
}

const PakarSlide: React.FC<PakarSlideState> = ({ data }) => {
    return (
        <IonCard>
            <IonCardContent className="p-5">
                <div className="flex flex-col items-center justify-center">
                    <IonAvatar>
                        <IonImg src={profilePicture} alt="Profile Pictures" />
                    </IonAvatar>
                    <span className="mt-2 text-2xl text-slate-900">{data.name}</span>
                    <span className="-mt-1 text-xs text-slate-500">{data.title}</span>
                    <div className="p-4 text-center">
                        <span className="mt-3 text-center text-slate-700">
                            {data.description}
                        </span>
                    </div>
                </div>
            </IonCardContent>
        </IonCard>
    )
}

export default PakarSlide;