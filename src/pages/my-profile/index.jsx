import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Paper, Tabs, Tab } from '@material-ui/core'

import { getIsAdmin } from 'store/user';
import TabPanel from './tab-panel'
import VignetteTypesTable from './vignette-types-table'
import UserInfo from './user-info';
import ManageUsers from './manage-users';
import Overview from 'pages/overview';
import { tabs, adminTabs } from './user-tabs'

const MyProfile = (props) => {
    
    const classes = useStyles();
    const history = useHistory();
    const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const isAdmin = useSelector(getIsAdmin);

    const [tab, setTab] = useState(0);

    const mergedTabs = [
        ...tabs,
        ...adminTabs
    ]

    const switchToSelectedTab = () => {
        const { tab } = props.match.params;
        const index = mergedTabs.findIndex(_tab => _tab.url === tab)
        setTab(index)
    }

    useEffect(() => {
        switchToSelectedTab()
    }, [props.match.params])
  
    useEffect(() => {
        switchToSelectedTab()
    }, [])

    const handleTabChange = (event, val) => {
        setTab(val); 
        history.push(`/profil/${mergedTabs[val].url}`)
    }


  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
            <Paper>
                <Tabs
                    orientation={matches ? 'horizontal' : 'vertical'}
                    value={tab}
                    onChange={handleTabChange}
                    className={classes.tabs}
                    scrollButtons="auto"
                    variant="scrollable"
                >
                    {tabs.map((tab, i) => (
                        <Tab key={i} label={tab.label} disabled={tab.isDisabled} />
                    ))}

                    {isAdmin && adminTabs.map((tab, i) => (
                        <Tab key={i} label={tab.label} />
                    ))}
                </Tabs>
            </Paper>
        </Grid>
        
        <Grid item xs={12} sm={8}>        
            <TabPanel value={tab} index={0}>
                <Overview />
            </TabPanel>      
                     
            <TabPanel value={tab} index={1}>
                <UserInfo />
            </TabPanel>

            <TabPanel value={tab} index={4}>
                <VignetteTypesTable />
            </TabPanel>

            <TabPanel value={tab} index={5}>
                <ManageUsers />
            </TabPanel>
        </Grid>
    </Grid>
  )
}

export default MyProfile;

const useStyles = makeStyles((theme) => ({

}));