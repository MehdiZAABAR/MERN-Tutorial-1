// import React, { useState, useContext, useEffect }  from 'react'
// import { AppDataSharingContext } from '../../App';
// import useDataFetching from '../../hooks/useDataFetching';

// const ContextDataManager = async() => {
//     const { appTrays, setAppTrays, appSeeds, setAppSeeds } = useContext(AppDataSharingContext);
//     let {data, loading, setData} = {null, null, null};
//     if (!appTrays || appTrays.length === 0)
//         {
//             {data} = await useDataFetching('Trays', setAppTrays);
//             console.log( `In ContextManager data from fetcher = ${JSON.stringify(data)}`);
//             setAppTrays(data);
//         }
        
    
//   return (
//     <div>{`appTrays = ${JSON.stringify(appTrays)}`}</div>
//   )
// }

// export default ContextDataManager
import React, { useState, useContext, useEffect } from 'react';
import { AppDataSharingContext } from '../../App';
import {useDataFetching, fetchDataAsync} from '../../hooks/useDataFetching';

const fetchDataAndUpdateContext = async (endpoint, contextSetter) => {
    // console.log( 'fetch data', endpoint);
    const { data } = await fetchDataAsync(endpoint);
    if (contextSetter) {
        contextSetter(data);
    }
    return data;
};

const ContextDataManager = () => {
    const { appTrays, setAppTrays, appSeeds, setAppSeeds } = useContext(AppDataSharingContext);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const getTheData = async () => {
            if (!appTrays || appTrays?.length === 0) {
                await fetchDataAndUpdateContext('Trays', setAppTrays);
                setDataFetched(true);
            }
            if (!appSeeds || appSeeds?.length === 0) {
                await fetchDataAndUpdateContext('Seeds', setAppSeeds);
                setDataFetched(true);
            }
        };
        if (!dataFetched) {
            getTheData();
        }
    }, [appTrays, setAppTrays, dataFetched]);
    // useEffect(() => {
    //         console.log('Updated appTrays:', appTrays);
    //         console.log('Updated appSeeds:', appSeeds);
    // }, [appTrays, appSeeds]);
    return null;
}

export default ContextDataManager;