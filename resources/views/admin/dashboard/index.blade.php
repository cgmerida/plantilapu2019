@extends('admin.master')

@section('css')
    <style>
        #mapa {
            height: 85vh;
            min-height: 400px;
            width: 100%;
            min-width: 200px;
            margin: 0 auto;
        }
        .loading {
            margin-top: 10em;
            text-align: center;
            color: gray;
        }
    </style>
@endsection

@section('content')

    <div class="row gap-20 masonry pos-r mT-nv-50">
        <div class="masonry-item col-12">
            <!-- #Site Visits ==================== -->
            <div class="bd bgc-white">
                <div class="peers fxw-nw@lg+ ai-s">
                    <div class="peer peer-greed w-70p@lg+ w-100@lg- p-20">
                        <div class="layers">
                            <div class="layer w-100">
                                <div id="mapa"></div>
                            </div>
                        </div>
                    </div>
                    <div class="peer bdL p-20 w-30p@lg+ w-100p@lg-">
                        <div class="layers">
                            <div class="layer w-100">
                                <!-- Progress Bars -->
                                <div class="layers mB-15" id="progress-layer">
                                    <div class="layer w-100 mT-20 c-grey-900">
                                        <center>
                                            <i class="fa fa-circle-o-notch fa-spin fa-5x"></i>
                                        </center>
                                    </div>
                                </div>

                                <!-- Pie Charts -->
                                {{-- <div class="peers pT-20 mT-20 bdT fxw-nw@lg+ jc-sb ta-c gap-10">
                                    <div class="peer">
                                        <div class="easy-pie-chart" data-size='80' data-percent="75" data-bar-color='#f44336'>
                                            <span></span>
                                        </div>
                                        <h6 class="fsz-sm">New Users</h6>
                                    </div>
                                    <div class="peer">
                                        <div class="easy-pie-chart" data-size='80' data-percent="50" data-bar-color='#2196f3'>
                                            <span></span>
                                        </div>
                                        <h6 class="fsz-sm">New Purchases</h6>
                                    </div>
                                    <div class="peer">
                                        <div class="easy-pie-chart" data-size='80' data-percent="90" data-bar-color='#ff9800'>
                                            <span></span>
                                        </div>
                                        <h6 class="fsz-sm">Bounce Rate</h6>
                                    </div>
                                </div> --}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection