enum PageNames {
    Home = 'Home',
    Trending = 'Trending'
}

enum PageTags {
    Home = 'page-home',
    Trending = 'page-trending'
}

type PageConfig = {
    name: PageNames;
    tag: PageTags;
};

export { PageNames, PageTags, PageConfig };