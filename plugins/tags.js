export default ({ app }, inject) => {
    inject('tags', {
        Vue: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        JavaScript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        React: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        Nuxt: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        "Next-js": 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    })
}