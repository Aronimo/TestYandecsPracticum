import React from 'react';
import { Tab, Counter, CurrencyIcon } from '../../index';
import Modal from '../Popup/Popup';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Console } from 'console';
import style from './BurgerIngredients.module.css'
import { Prev } from 'react-bootstrap/esm/PageItem';

interface IAppBurgerIngreds {
    condition: string,
    data: any,
    DataConstructor: any
}

enum TypeIngredient {
    bun = "Булки",
    sauce = "Соусы",
    main = "Начинки",
}     

class AppBurgerIngredients extends React.Component<IAppBurgerIngreds> {
    constructor(props: { condition: string, data: any, DataConstructor :any } ) {
        super(props);
    };

    state = {
        Data: this.props.data,
        DataConstructor: this.props.DataConstructor,
        itemPopup: "0"
    };

    setitemPopup = (_id: any) => {
        console.log(_id)
                this.setState(prev => ({
                    ...prev,
                    itemPopup: _id
                }))
    }

    setDefitemPopup = () => {
        
        this.setState(prev => ({
            ...prev,
            itemPopup: "0"
        }))
    }

    renderDetail = () => {
        console.log(this.state.itemPopup)
        var item = this.state.Data.find((f: { _id: string; }) => f._id == this.state.itemPopup);

        return (
            <>
                {this.state.itemPopup != "0" && (
                    <div className={style.TitleDetail}>
                        <div className={style.TitlePopup}>
                            <label>Детали ингредиента</label>
                        </div>
                        <div>
                            <img src={item.image_large} />
                        </div>
                        <div className={style.TitleIngName}>
                            <label>{item.name}</label>
                        </div>
                        <div className={style.TitleEnergyValue}>
                            <div>
                                <label>Калории, ккал </label><br/>
                                <label>{item.calories}</label></div>
                            <div>
                                <label>Белки, г </label><br />
                                <label>{item.proteins}</label></div>
                            <div>
                                <label>Жиры, г </label><br />
                                <label>{item.fat}</label></div>
                            <div>
                                <label>Углеводы, г </label><br />
                                <label>{item.carbohydrates}</label>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

    render() {
        return (
            <>
              {this.state.itemPopup !== "0" && <Modal visible={true} handleClose={this.setDefitemPopup} > {this.renderDetail()}</Modal>}
              <label className={style.Title}>Соберите Бургер</label>
              <Tabs />
              <ListIngredients condition={this.props.condition} data={this.state.Data} DataConstructor={this.state.DataConstructor} OpenPopup={this.setitemPopup} />
          </>
    );
  }
}

const Tabs = () => {
    //нужно получить первый элемент из 
    //Object.entries(TypeIngredient)
    const [current, setCurrent] = React.useState("bun")
    return (
        <div className={style.Tabs}>
            {
                Object.entries(TypeIngredient).map(
                    ([key, value]) => (
                        <Tab value={key} active={current === key} onClick={setCurrent  }>
                            {value}
                        </Tab>)
                )
            }
        </div>
    )
}

const ListIngredients = (props: { condition: string, data: any, OpenPopup: any, DataConstructor: any }) => {
    return (
        <div className={style.ListIngredient}>
            {
                Object.entries(TypeIngredient).map(
                    ([key, value]) => (
                        <>
                            <label className={style.Headline} >{value} </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {
                                    props.data.filter((f: { type: string; }) => f.type === key).map((item: any) => (
                                        <a>
                                        <div key={item._id} className={style.IngredientItem} onClick={() => props.OpenPopup(item._id)} >
                                                <Ingredient condition={props.condition} item={item} count={props.DataConstructor.filter((f: { id: any; }) => f.id == item._id).length} />
                                            </div>
                                            </a>
                                    ))
                                }
                            </div>
                        </>
                    )
                )
            }
        </div>
    )
};


const Ingredient = (props: { condition: any, item: any , count:any }) => {
    let title = "Белки : " + props.item.proteins +
        "\r\nЖиры : " + props.item.fat +
        "\r\nУглеводы : " + props.item.carbohydrates +
        "\r\nКалорий : " + props.item.calories;

    return (
        <>
            <img src={props.item.image} title={title} className={style.illustration} />
            {typeof (props.count) !== "undefined" && <Counter size="small" count={props.count} />}
            <div className={style.price}>
                <label > {props.item.price} </label> <CurrencyIcon type={props.condition} />
            </div>
            <div className={style.Name}>
                <label > {props.item.name} </label>
            </div>
            
        </>
    )
}


export default AppBurgerIngredients;
