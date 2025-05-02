const SectionTitle = ({ heading, subheading }) => {
    return (
        <div className='mx-auto text-center px-6 lg:px-0 py-0'>
            <div className='divider sm:w-4/6 md:w-1/2 mx-auto my-3'>
                <h1 className='text-center md:text-2xl font-semibold text-[#1a2b3d]'>{heading}</h1>
            </div>
            <h4 className="md:w-[45%] mx-auto md:pb-2 mb-1 md:mb-0 font-normal text-[#5a6573] lg:font-medium">{subheading}</h4>
        </div>
    );
};

export default SectionTitle;
