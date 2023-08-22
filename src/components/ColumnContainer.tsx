
import { Column } from '../types';

interface Props {
    column: Column;
}


function ColumnContainer(props: Props) {
    const { column } = props

    return (
        <div className='bg-[#FAF0E6] w-[350px] h-[400px] rounded-xl text-[#5C5470] flex flex-col'>
            <div className='bg-[#5C5470] rounded-xl'>

            {column.title}
            </div>
            <div className='flex flex-grow'>
                Content
            </div>
        </div>
    )
}

export default ColumnContainer
