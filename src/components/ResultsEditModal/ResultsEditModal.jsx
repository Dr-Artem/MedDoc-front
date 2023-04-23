import style from './ResultsEditModal.module.css';

export const ResultsEditModal = () => {
    return (
        <div className={style.Backdrop}>
            <div className={style.Modal}>
                <div className={style.Modal_HeaderWrapper}>
                    <p className={style.Modal_Header}>Edit data</p>
                    <svg
                        className={style.Modal_HeaderCloseIcon}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 6L6 18"
                            stroke="#111111"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M6 6L18 18"
                            stroke="#111111"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
                <form className={style.Modal_Form}>
                    <ul className={style.Modal_FormList}>
                        <li className={style.Modal_FormItem}>
                            <p className={style.Modal_FormItemHead}>Doctor</p>
                            <input type="text" id="doctor" className={style.Modal_FormInput} />
                        </li>
                        <li className={style.Modal_FormItem}>
                            <p className={style.Modal_FormItemHead}>Date</p>
                            <input type="text" id="date" className={style.Modal_FormInput} />
                        </li>
                        <li className={style.Modal_FormItem}>
                            <label for="fileInput" className={style.Modal_FormLabel}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_365_657)">
                                        <path
                                            d="M14.0496 9.45009L6.54961 1.95009C5.29961 0.650092 3.24961 0.650092 1.94961 1.90009C0.649609 3.15009 0.649609 5.25009 1.94961 6.50009L1.99961 6.55009L3.39961 8.00009L4.09961 7.30009L2.64961 5.85009C1.79961 5.00009 1.79961 3.55009 2.64961 2.70009C3.49961 1.85009 4.94961 1.80009 5.79961 2.65009L5.84961 2.70009L13.2996 10.1501C14.1996 11.0001 14.1996 12.4501 13.3496 13.3001C12.4996 14.2001 11.0496 14.2001 10.1996 13.3501L10.1496 13.3001L6.44961 9.60009C5.94961 9.10009 5.99961 8.30009 6.44961 7.85009C6.68931 7.63296 7.00118 7.51271 7.32461 7.51271C7.64804 7.51271 7.95991 7.63296 8.19961 7.85009L10.2496 9.90009L10.9496 9.20009L8.84961 7.10009C8.63675 6.89879 8.38615 6.74161 8.11226 6.63761C7.83837 6.53362 7.54661 6.48486 7.25379 6.49416C6.96096 6.50346 6.67288 6.57062 6.40614 6.69178C6.13939 6.81294 5.89927 6.98569 5.69961 7.20009C4.89961 8.05009 4.89961 9.40009 5.69961 10.3001L9.44961 14.0501C10.6996 15.3501 12.7496 15.3501 14.0496 14.1001C15.3496 12.8501 15.3496 10.7501 14.0496 9.45009C14.0496 9.50009 14.0496 9.45009 14.0496 9.45009Z"
                                            fill="#121417"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_365_657">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Click here if you want to add your file
                            </label>
                            <input type="file" id="fileInput" className={style.Modal_FormUpload} />
                        </li>
                    </ul>
                    <button type="submit" className={style.Modal_FormBtn}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};
