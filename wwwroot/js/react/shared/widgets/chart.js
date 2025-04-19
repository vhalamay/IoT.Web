import React from 'react';

export default class WidgetChart extends React.Component {
    render() {

        // Value
        const getValue = (item) => {
            let value = item.blue !== undefined ? getBlueValue(item) : getGreenValue(item);
            return value + '%';
        }

        const getGreenValue = (item) => {
            if(item.green + item.red === 0)
                return 0;

            return (100 * item.green / (item.green + item.red)).toFixed(0);
        }

        const getBlueValue = (item) => {
            if(this.props.chart.max === 0)
                return 0;
            
            return (100 * item.blue / this.props.chart.max).toFixed(0);
        }

        // Text
        const getText = (item) => {
            return item.blue !== undefined ? getBlueText(item) : getGreenText(item);
        }
        
        const getBlueText = (item) => {
            var value = getBlueValue(item);
            return value < 15 ? '' : item.blue;
        }

        const getGreenText = (item) => {
            var value = getGreenValue(item);
            return value < 15 ? '' : (getGreenValue(item) + '%');
        }

        // Title
        const getTitle = (item) => {
            return item.blue !== undefined ? getBlueTitle(item) : getGreenTitle(item);
        }
        
        const getBlueTitle = (item) => {
            return item.blue;
        }

        const getGreenTitle = (item) => {
            return getGreenValue(item) + '%';
        }

        // Classes
        const getStripeClasses = (item) => {
            return 'strp ' + (item.blue !== undefined ? 'l-blue' : 'l-green');
        }

        const getItemClasses = (item) => {
            return 'itm ' + (item.red > 0 ? 'l-red' : '');
        }

        var chartItems = this.props.chart.items.map((item, index) => 
            <div key={index} className={getItemClasses(item)} title={getTitle(item)}>
                <div className={getStripeClasses(item)} style={{"height": getValue(item)}}>
                    <div className='txt'>
                        {getText(item)}
                    </div>
                </div>
            </div>);

        var chartBottoms = this.props.chart.items.map((item, index) => 
            <div key={index} className='btm'>
                {item.text}
            </div>);

        return  <div className='chrt'>
                    <div className='cnt'>
                        <div className='top'>
                            <div>
                                {this.props.chart.text}
                            </div>
                            <div>
                                {this.props.chart.info}
                            </div>
                        </div>
                        <div className='itms'>
                            {chartItems}
                        </div>
                        <div className='btms'>
                            {chartBottoms}
                        </div>
                    </div>
                </div>;
    }
}