import Accordion from 'components/shared/accordion'
import articles from './articles';

const Information = () => {

    return (
        <div>
            <Accordion data={articles}></Accordion>
        </div>
    )
}

export default Information;
  