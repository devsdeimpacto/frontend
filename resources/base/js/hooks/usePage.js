const usePage = ({ id, title }) => {

    // 
    document.title = `Deu Ruim Aqui | ${title}` || document.title;

    //
    document.body.id = id || document.body.id;
};

export default usePage;