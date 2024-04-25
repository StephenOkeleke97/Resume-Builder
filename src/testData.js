const data = [
  {
    type: "Header",
    id: "xyz",
    name: {
      value: "Name",
      color: "",
    },
    title: {
      value: "Title",
      color: "",
    },
    summary: {
      value: "Summary",
      color: "",
    },
  },
  {
    type: "Contact",
    id: "yyz",
    contacts: [
      {
        type: "Email",
        value: "email value",
        id: "yyz-1",
        link: "",
      },
      {
        type: "Phone Number",
        value: "phone value",
        id: "yyz-2",
        link: "",
      },
      {
        type: "Linkedin",
        value: "linkedin value",
        id: "yyz-3",
        link: "https://www.cnn.com",
      },
    ],
    color: "#32e295",
  },
  {
    type: "Tile",
    id: "qrs",
    title: {
      value: "Tile Title",
      color: "#e23232",
    },
    tiles: [
      {
        value: "Java",
        id: "qrs-1",
      },
      {
        value: "Docker",
        id: "qrs-2",
      },
    ],
    color: "#e232a1",
  },
  {
    type: "Detail",
    id: "abc",
    title: {
      value: "Detail Title",
      color: "#2c72b5",
    },
    details: [
      {
        id: "abc-1",
        title: {
          value: "title 1",
          color: "#2c72b5",
        },
        subtitle: {
          value: "subtitle 1",
          color: "#2c72b5",
        },
        timeRange: {
          value: "timerange 1",
          color: "#2c72b5",
        },
        location: {
          value: "location 1",
          color: "#2c72b5",
        },
        detailItems: [
          {
            id: "abc-1-1",
            value: "detail item 1",
          },
          {
            id: "abc-1-2",
            value: "detail item 2",
          },
        ],
      },
      {
        id: "abc-2",
        title: {
          value: "title 2",
          color: "#2c72b5",
        },
        subtitle: {
          value: "subtitle 2",
          color: "#2c72b5",
        },
        timeRange: {
          value: "timerange 2",
          color: "#2c72b5",
        },
        location: {
          value: "location 2",
          color: "#2c72b5",
        },
        detailItems: [
          {
            id: "abc-2-1",
            value: "detail item 1",
          },
          {
            id: "abc-2-2",
            value: "detail item 2",
          },
        ],
      },
    ],
  },
  {
    type: "Bar",
    id: "rty",
    title: {
      value: "Bar Title",
      color: "#2c72b5",
    },
    color: "#808285",
    bars: [
      {
        value: "English",
        id: "rty-1",
        percentage: "40",
      },
      {
        value: "French",
        id: "rty-2",
        percentage: "87",
      },
    ],
  },
];

export default data;
