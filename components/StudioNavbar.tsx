import Link from 'next/link';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

function StudioNavbar(props: any) {
    return (
        <div>
            <div>
                <Link href="/" className='text-red-500 flex items-center p-5'>
                    <ArrowUturnLeftIcon className='h-6 w-6 mr-2' />
                    Go Back
                </Link>
            </div>
            <>{props.renderDefault(props)}</>
        </div>
    )
}

export default StudioNavbar;
