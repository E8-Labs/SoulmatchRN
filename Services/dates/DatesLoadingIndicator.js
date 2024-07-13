import { View, Text, Dimensions } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const { height, width } = Dimensions.get('window')

export default DatesLoadingIndiccator = ({ from = "user" }) => {
    return (
        <ContentLoader
            height={height}
            width={width}
            speed={1}
            backgroundColor={'#D5D0F6'}
            foregroundColor={'#ececec'}
        // viewBox="0 0 380 70"
        >
            {/* {renderItems()} */}

            {
                from === "user" && <Rect x={30} y={0} ry={5} rx={5} height={30} width={250} />
            }
            <Rect x={30} y={50} ry={5} rx={5} height={100} width={150} />
            <Rect x={30} y={160} ry={5} rx={5} height={10} width={100} />
            <Rect x={30} y={180} ry={5} rx={5} height={10} width={50} />
            <Rect x={150} y={180} ry={5} rx={5} height={10} width={30} />
            <Rect x={30} y={200} ry={5} rx={5} height={10} width={50} />
            <Rect x={150} y={200} ry={5} rx={5} height={10} width={30} />
            <Rect x={30} y={220} ry={5} rx={5} height={10} width={50} />
            <Rect x={150} y={220} ry={5} rx={5} height={10} width={30} />

            <Rect x={250} y={50} ry={5} rx={5} height={100} width={150} />
            <Rect x={250} y={160} ry={5} rx={5} height={10} width={100} />
            <Rect x={250} y={180} ry={5} rx={5} height={10} width={50} />
            <Rect x={370} y={180} ry={5} rx={5} height={10} width={30} />
            <Rect x={250} y={200} ry={5} rx={5} height={10} width={50} />
            <Rect x={370} y={200} ry={5} rx={5} height={10} width={30} />
            <Rect x={250} y={220} ry={5} rx={5} height={10} width={50} />
            <Rect x={370} y={220} ry={5} rx={5} height={10} width={30} />

            {
                from === "user" && <Rect x={30} y={280} ry={5} rx={5} height={30} width={250} />

            }

            <Rect x={30} y={360} ry={5} rx={5} height={100} width={150} />
            <Rect x={30} y={470} ry={5} rx={5} height={10} width={100} />
            <Rect x={30} y={490} ry={5} rx={5} height={10} width={50} />
            <Rect x={150} y={490} ry={5} rx={5} height={10} width={30} />
            <Rect x={30} y={510} ry={5} rx={5} height={10} width={50} />
            <Rect x={150} y={510} ry={5} rx={5} height={10} width={30} />
            <Rect x={30} y={530} ry={5} rx={5} height={10} width={50} />
            <Rect x={150} y={530} ry={5} rx={5} height={10} width={30} />

            <Rect x={250} y={360} ry={5} rx={5} height={100} width={150} />
            <Rect x={250} y={470} ry={5} rx={5} height={10} width={100} />
            <Rect x={250} y={490} ry={5} rx={5} height={10} width={50} />
            <Rect x={370} y={490} ry={5} rx={5} height={10} width={30} />
            <Rect x={250} y={510} ry={5} rx={5} height={10} width={50} />
            <Rect x={370} y={510} ry={5} rx={5} height={10} width={30} />
            <Rect x={250} y={530} ry={5} rx={5} height={10} width={50} />
            <Rect x={370} y={530} ry={5} rx={5} height={10} width={30} />

            {
                from === "user" && <Rect x={30} y={580} ry={5} rx={5} height={30} width={250} />
            }



        </ContentLoader>
    )
}