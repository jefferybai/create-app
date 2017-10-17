import React, {Component, PropTypes} from 'react'
import {Select} from 'antd'
import classNames from 'classnames';
const Option = Select.Option

class SelectPlus extends Component {
    constructor() {
        super()
        this.state = {
            label: 'please select',
            id: ''
        }
    }

    setSelectIndex(i, nextProps) {
        const {dataProvider, onChange, labelField} = nextProps ? nextProps : this.props;
        if (i == -1) {
            this.setState({label: 'please select', id: ''});
            return;
        }
        if (dataProvider.length && i >= 0) {
            this.setState({label: labelField ? dataProvider[i][labelField] : dataProvider[i]});
        } else {
            this.setState({label: 'please select', id: ''})
        }
    }

    componentWillMount() {
        this.setSelectIndex(this.props.selectIndex, this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataProvider instanceof Array) {
            this.setSelectIndex(nextProps.selectIndex, nextProps);
        }
    }

    onSelectChange(value) {
        const {onChange, dataProvider} = this.props;
        const i = parseInt(value);
        this.setSelectIndex(i);
        onChange(dataProvider[i], i);
    }

    render() {
        const {
            dataProvider, labelField, style, dropdownClassName, disabled,
            className, size, onItemMouseEnterHandler, onItemMouseLeaveHandler,value, selectIndex
        } = this.props;
        return (
            <Select className={className} dropdownClassName={dropdownClassName} disabled={disabled}
                    size={size} style={style} value={value || this.state.label} onChange={this.onSelectChange.bind(this)}>
                {
                    dataProvider.map(
                        (item, i) => (
                            <Option key={i} value={i.toString()} disabled={item.disabled} 
                            defaultActiveFirstOption={false}>
                                <span className={classNames('item-select', {'item-select-active': selectIndex == i})}
                                    onMouseEnter={onItemMouseEnterHandler && onItemMouseEnterHandler.bind(this, item)}
                                    onMouseLeave={onItemMouseLeaveHandler && onItemMouseLeaveHandler.bind(this, item)}>
                                {labelField ? item[labelField] : item.toString()}</span>
                            </Option>
                        )
                    )
                }
            </Select>
        )
    }
}

SelectPlus.propTypes = {
    onChange: PropTypes.func.isRequired,
    dataProvider: PropTypes.array.isRequired,
    labelField: PropTypes.string.isRequired,
    selectIndex: PropTypes.number
}

export default SelectPlus;