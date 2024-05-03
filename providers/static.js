export default {
    getImage(src, { modifiers, baseURL }) {
      // Ignore modifiers and return the path directly
        return `${baseURL}${src}`;
    }
}