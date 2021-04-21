import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AppAccordion = ({ data }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            {data.map(article => (
                <Accordion 
                    expanded={expanded === article.title} 
                    onChange={handleChange(article.title)} 
                    key={article.title}
                    className={classes.accordion}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{article.title}</Typography>
                        <Typography className={classes.secondaryHeading}>{article.subtitle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{article.text}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
            
    </div>
    )
}

export default AppAccordion;

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    accordion: {
        padding: '15px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));