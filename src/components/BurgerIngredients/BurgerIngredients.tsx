import React from 'react';
import { Tab, Counter, CurrencyIcon } from '../../index';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Console } from 'console';

interface IAppBurgerIngreds {
    condition: string,
    data: any
}

enum TypeIngredient {
    bun = "Булки",
    sauce = "Соусы",
    main = "Начинки",
}     

class AppBurgerIngredients extends React.Component<IAppBurgerIngreds> {
    constructor(props: { condition: string, data:any} ) {
        super(props);
        console.log(props.data)
    };

    state = {
        Data: this.props.data
    };

    AddIndigriend = (id: string) => {
        var DataNew = this.state.Data;
        let indexElement = DataNew.findIndex((f: { _id: string; }) => f._id == id);
        let countBun = 0;
        if (DataNew[indexElement].type == "bun") {
            DataNew.filter((f: { type: string; }) => f.type === "bun").map((item: any) => countBun += item.__v);
        }
        console.log(countBun)
        console.log(DataNew)
        if (countBun == 0) {
            DataNew[indexElement].__v = DataNew[indexElement].__v + 1;
            console.log(',kf ,kf' + id + ' ' + DataNew[indexElement].__v);
            this.setState(prev => ({
                ...prev,
                Data: DataNew
            }))
        } else (alert(TypeIngredient.bun + " была добавлена ранее"))
    }

  render() {
      return (
          <>
              <Tabs />
              <ListIngredients condition={this.props.condition} data={this.state.Data} AddIndigriend={this.AddIndigriend} />
          </>
    );
  }
}

const Tabs = () => {
    //нужно получить первый элемент из 
    //Object.entries(TypeIngredient)
    const [current, setCurrent] = React.useState("bun")
    return (
        <div style={{ display: 'flex' }}>
            {
                Object.entries(TypeIngredient).map(
                    ([key, value]) => (
                        <Tab value={key} active={current === key} onClick={setCurrent  }>
                            <a href={'#' + key}> {value} </a>
                        </Tab>)
                )
            }
        </div>
    )
}

const ListIngredients = (props: { condition: string, data: any, AddIndigriend: any }) => {
    return (
        <div style={{ overflowY: 'scroll', height: '500px' }}>
            {
                Object.entries(TypeIngredient).map(
                    ([key, value]) => (
                        <>
                            {/*разобратся а Anchor в рамках скрола внутри Div
                            вроде нужно есть решение в рамках Element - нужно разобраться*/}
                            <ScrollableAnchor id={key} >
                                <div>
                                    <label className="text text_type_main-default p-2'" >{value} </label>
                                </div>
                            </ScrollableAnchor>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignSelf: 'center' }}>
                                {
                                    props.data.filter((f: { type: string; }) => f.type === key).map((item: any) => (
                                        <div key={item._id} className="p-2" style={{ width: '260px', position: 'relative', cursor:'pointer' }} onClick={() => props.AddIndigriend(item._id)} >
                                                <Ingredient condition={props.condition} item={item} />
                                        </div>
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


const Ingredient = (props: { condition: any, item: any }) => {
    let title = "Белки : " + props.item.proteins +
        "\r\nЖиры : " + props.item.fat +
        "\r\nУглеводы : " + props.item.carbohydrates +
        "\r\nКалорий : " + props.item.calories;
    let counter;

    return (
        <>
            <div> <img src={props.item.image} title={title} /> {props.item.__v != 0 && <Counter size="small" count={props.item.__v} />
            }
            </div>
            <div>
                <label className="text text_type_main-small p-2'"> {props.item.name} </label>
            </div>
            <div>
                <label className="text text_type_digits-default p-2'"> <CurrencyIcon type={props.condition} /> {props.item.price} </label>
            </div>
        </>
    )
}

export default AppBurgerIngredients;
