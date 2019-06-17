export interface Category {
  /**
   * include tags
   */
  tags: string[]
  title: string

  /**
   * hex style
   * #ffffff
   */
  bgColor: string

  /**
   * font-awesome class
   * example: fab fa-github
   */
  icon: string
}

export interface ShareItem {
  title: string
  desc: string
  tags: string[]

  /**
   * web address
   */
  links: {
    [key: string]: string
    web: string
    github: string
  }
}

export interface SiteConfig {
  header: {
    bgImg: string
    color: string
    edit: {
      title: string
      addr: string
    }
  }
  navigation: {
    /**
     * font-awesome class
     * example: fab fa-github
     */
    icons: {
      [key: string]: string
      web: string
      git: string
    }
  }
}
