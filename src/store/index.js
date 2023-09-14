import { createStore }  from "redux";
import {UPDATE_FORM,
        UPDATE_RECIPE,} from '../actions/memberAction';

const initialState = {
  userName                : "" ,  // 鑑定者名称
  userYear                : "" ,  // 生年月日(年)
  userMonth               : "" ,  // 生年月日(月)
  userDay                 : "" ,  // 生年月日(日)
  userSex                 : "" ,  // 性別
  userAge                 : "" ,  // 年齢
  syukuYouRekiNum         : "" ,  // 宿陽暦番号
  syukuYouRekiName        : "" ,  // 宿名
  syukuYouRekiYomi        : "" ,  // 宿名(読み方)
  seikaku                 : "" ,  // 1.性格
  tekisyoku               : "" ,  // 2.適職
  okane                   : "" ,  // 3.お金
  kenkou                  : "" ,  // 4.健康
  renai                   : "" ,  // 5.恋愛
  kaiunn                  : "" ,  // 6.開運
  partnerName             : "" ,  // 相手の名前
  partnerYear             : "" ,  // 相手の生年月日(年)
  partnerMonth            : "" ,  // 相手の生年月日(月)
  partnerDay              : "" ,  // 相手の生年月日(日)
  partnerSex              : "" ,  // 相手の性別
  partnerRekiNum          : "" ,  // 相手の宿陽暦番号
  partnerRekiName         : "" ,  // 相手の宿名
  partnerRekiYomi         : "" ,  // 相手の宿名(読み方)
  userPartnerRelationship : "" ,  // 自分相手関係の宿
  partnerUserRelationship : "" ,  // 相手自分関係の宿
  strDistance             : "" ,  // 二人の距離
  partnerKankei           : "" ,  // 1.お二人の関係
  partnerKihon            : "" ,  // 2.基本的な相性
  partnerRenai            : "" ,  // 3.恋愛関係の相性
  partnerShigoto          : "" ,  // 4.仕事関係の相性
  userPartner             : "" ,  // 5.自分側から見た相手との関係
  partnerUser             : "" ,  // 6.相手側から見た自分との関係
  nowSyukuYouRekiNum      : "" ,  // 日運表で使用する宿曜暦番号
  nowSyukuYouRekiName     : "" ,  // 日運表で使用する宿名
};

const reducer = (state = initialState ,action) => {
    switch (action.type) {
        case UPDATE_FORM:
            let formState = {...state};
            formState = action.payload;
            return formState;
        case UPDATE_RECIPE:
            let recipeState = {...state};
            recipeState = action.payload;
            return recipeState;
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;