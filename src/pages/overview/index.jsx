import { Grid } from '@material-ui/core';

import Vignette from 'components/vignette'
import Loader from 'components/shared/loader'

import Modal from 'components/modal'

const Overview = () => {

    //mocked vignette
    const vignettes = [{
        vignetteId: 0,
        licensePlate: '4A2 3000',
        serialNumber: 'XXX',
        vignetteType: {
            id: 1,
            name: '10denni',
            display_name: '10ti denní',
            price: 310,
            duration: '10 00:00:00'
        },
        usedId: 0,
        validFrom: '2021-03-27'
    }]
    
    
    if (!vignettes.length)
        return <Loader />

    return (
        <div>
            <Grid container spacing={1}>
                {[1, 2, 3, 4, 5].map((v, i) => (
                    <Grid item xs={6} sm={4} key={i}>
                        <Vignette vignette={vignettes[0]} />
                    </Grid>
                ))}
            </Grid>
            {/*<Modal />*/}
        </div>
    )
}

export default Overview;
