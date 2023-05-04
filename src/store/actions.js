/**

 */

import { getCart } from "../service/cart";

export default {
  async updateCart(ctx) {
    const { data } = await getCart();

    if (data == null) {
      ctx.commit("addCart", {
        count: 0,
      });
    } else {
      ctx.commit("addCart", {
        count: data.length,
      });
    }
  },
};
