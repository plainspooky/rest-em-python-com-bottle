    <div class='container text-center'>
        <hr/>
        <p><a href="https://github.com/plainspooky/rest-em-python-com-bottle" target="_BLANK">Repositório deste programa no GitHub.</a></p>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    %if defined('js'):
        %for file in js:
    <script src="/static/{{file}}"></script>
        %end
    %end
    </body>
</html>
