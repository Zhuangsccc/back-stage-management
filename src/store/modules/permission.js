import { constantRoutes } from '@/router';
import { listRoutes } from '@/api/menu';
export const Layout = () => import('@/layout/index.vue');
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        if (roles.includes('ROOT')) {
            return true;
        }
        return roles.some(role => {
            if (route.meta?.roles !== undefined) {
                return (route.meta.roles).includes(role);
            }
        });
    }
    return false;
};
function loadView(view) {
    return (resolve) => require([`@/views/${view}`], resolve)
}
function filterAsyncRoutes(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)&&tmp.state) {
            if (tmp.component == 'Layout') {
                tmp.component = Layout;
            } else {
                const component = loadView(tmp.component);
                if (component) {
                    tmp.component = component;
                } else {
                    tmp.component = loadView("404.vue");
                }
            }
            res.push(tmp);

            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
        }
    });
    return res;
};
const state = {
    routes: [],
    addRoutes: [],
    allRoutes:[]
}

const mutations = {
    setRoutes(state, newRoutes) {
        state.addRoutes = newRoutes
        state.routes = constantRoutes.concat(newRoutes)
    },
    setAllRoutes(state,newRoutes){
        state.allRoutes = newRoutes
    }
}

const actions = {
    generateRoutes(context,roles) {
        return new Promise((resolve, reject) => {
            listRoutes()
                .then(response => {
                    context.commit("setAllRoutes",response.data)
                    const asyncRoutes = response.data;
                    const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
                    context.commit("setRoutes",accessedRoutes);
                    resolve(accessedRoutes);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
